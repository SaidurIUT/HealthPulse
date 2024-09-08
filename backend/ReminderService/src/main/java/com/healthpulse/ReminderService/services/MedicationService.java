package com.healthpulse.ReminderService.services;

import com.healthpulse.ReminderService.entities.Medication;
import com.healthpulse.ReminderService.entities.User;
import com.healthpulse.ReminderService.repositories.MedicationRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class MedicationService {

    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private UserService userService; // Feign client service

    @Autowired
    private JavaMailSender mailSender;

    // Add a medication
    public Medication addMedication(Medication medication) {
        medication.setReminderSent(false); // Initialize as false
        return medicationRepository.save(medication);
    }
    
    
    

    // Get medications by user
    public List<Medication> getMedicationsByUser(Integer userId) {
        return medicationRepository.findByUserId(userId);
    }
    
 // Update a medication
    @Transactional
    public Medication updateMedication(Long id, Medication medication) {
        Optional<Medication> existingMedication = medicationRepository.findById(id);
        if (existingMedication.isPresent()) {
            Medication updatedMedication = existingMedication.get();
            updatedMedication.setName(medication.getName());
            updatedMedication.setDosage(medication.getDosage());
            updatedMedication.setUnit(medication.getUnit());
            updatedMedication.setMedicationType(medication.getMedicationType());
            updatedMedication.setAmount(medication.getAmount());
            updatedMedication.setFrequencyPerDay(medication.getFrequencyPerDay());
            updatedMedication.setTimes(medication.getTimes());
            updatedMedication.setStartDate(medication.getStartDate());
            updatedMedication.setDurationDays(medication.getDurationDays());
            updatedMedication.setInstructions(medication.getInstructions());
            updatedMedication.setReminderSent(medication.getReminderSent());
            updatedMedication.setUserId(medication.getUserId());
            return medicationRepository.save(updatedMedication);
        } else {
            throw new RuntimeException("Medication not found with id: " + id);
        }
    }
    
 // Delete a medication
    @Transactional
    public void deleteMedication(Long id) {
        medicationRepository.deleteById(id);
    }
    
    // Get medication by ID
    public Medication getMedicationById(Long id) {
        return medicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medication not found with id: " + id));
    }
    
 // Get current medications by user
    public List<Medication> getCurrentMedicationsByUser(Integer userId) {
        List<Medication> medications = medicationRepository.findByUserId(userId);
        return medications.stream()
                .filter(medication -> LocalDate.now().isBefore(medication.getStartDate().plusDays(medication.getDurationDays())))
                .toList();
    }

    

    // Send email reminder with improved theme and content
    private void sendEmailReminder(String email, String medicationName, LocalTime time, String dosage, String instructions) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setTo(email);
        helper.setSubject("Important: Medication Reminder");
        
        // Improved HTML template for email
        String emailContent = "<html><body style='font-family: Arial, sans-serif;'>"
                + "<h1 style='color: #1E90FF;'>HealthPulse: Medication Reminder</h1>"
                + "<p style='font-size: 16px;'>Dear User,</p>"
                + "<p style='font-size: 16px;'>This is a reminder to take your medication:</p>"
                + "<ul style='font-size: 16px;'>"
                + "<li><b>Medication:</b> " + medicationName + "</li>"
                + "<li><b>Time:</b> " + time + "</li>"
                + "<li><b>Dosage:</b> " + dosage + "</li>"
                + "<li><b>Instructions:</b> " + (instructions != null ? instructions : "No specific instructions.") + "</li>"
                + "</ul>"
                + "<p style='font-size: 16px;'>Please take your medication as prescribed. If you have any questions, don't hesitate to contact your doctor.</p>"
                + "<p style='font-size: 16px;'>Regards,<br><b>HealthPulse Team</b></p>"
                + "</body></html>";

        helper.setText(emailContent, true);
        mailSender.send(mimeMessage);
    }

    
    @Scheduled(fixedRate = 60000)
    @Transactional
    public void checkMedicationTimes() {
        List<Medication> medications = medicationRepository.findAll();
        LocalTime currentTime = LocalTime.now().withSecond(0).withNano(0); // Normalize currentTime to only hours and minutes
        LocalDate currentDate = LocalDate.now();

        for (Medication medication : medications) {
            if (currentDate.isBefore(medication.getStartDate().plusDays(medication.getDurationDays()))) {
                medication.getTimes().size(); // Ensure collection is initialized

                for (LocalTime time : medication.getTimes()) {
                    LocalTime normalizedTime = time.withSecond(0).withNano(0);

                    // Expanded reminder window
                    LocalTime windowStart = normalizedTime.minusMinutes(10);
                    LocalTime windowEnd = normalizedTime.plusMinutes(10);

                    if (currentTime.isAfter(windowStart) && currentTime.isBefore(windowEnd)) {
                        if (Boolean.FALSE.equals(medication.getReminderSent())) {
                            User user = userService.getUserById(medication.getUserId());
                            try {
                                sendEmailReminder(user.getEmail(), medication.getName(), time, medication.getDosage(), medication.getInstructions());
                                medication.setReminderSent(true);
                                medicationRepository.save(medication);
                            } catch (MessagingException e) {
                                e.printStackTrace(); // Print the stack trace to the console
                            }
                        }
                    }
                }
            }
        }
    }






    // Reset the `reminderSent` flag for all medications every day at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void resetDailyReminders() {
        List<Medication> medications = medicationRepository.findAll();
        for (Medication medication : medications) {
            medication.setReminderSent(false); // Reset reminder status for the day
            medicationRepository.save(medication);
        }
    }
}