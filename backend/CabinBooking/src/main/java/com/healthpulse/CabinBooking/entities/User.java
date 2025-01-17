package com.healthpulse.CabinBooking.entities;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private int id;
    private String name;
    private String email;
    private String imageName;
    private List<Role> roles = new ArrayList<>();
    private List<Booking> bookings = new ArrayList<>();

}