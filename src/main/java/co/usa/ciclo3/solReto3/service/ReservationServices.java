package co.usa.ciclo3.solReto3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.ciclo3.solReto3.model.Reservation;
import co.usa.ciclo3.solReto3.repository.ReservationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationServices {
    
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation p){
        if(p.getId()==null){
            return reservationRepository.save(p);
        }else{
            Optional<Reservation> paux=reservationRepository.getReservation(p.getId());
            if(paux.isEmpty()){
                return reservationRepository.save(p);
            }else{
                return p;
            }
        }
    }
}
