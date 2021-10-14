package co.usa.ciclo3.solReto3.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="Reservation")
public class Reservation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReservation;
    private String startDate;
    private String devolutionDate;

    @ManyToOne
    @JoinColumn(name="clientID")
    @JsonIgnoreProperties("reservations")
    private Client clientReserva;

    @ManyToOne
    @JoinColumn(name="farmID")
    @JsonIgnoreProperties("reservations")
    private Farm farm;

    public Integer getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getDevolutionDate() {
        return devolutionDate;
    }

    public void setDevolutionDate(String devolutionDate) {
        this.devolutionDate = devolutionDate;
    }

    public Client getClientReserva() {
        return clientReserva;
    }

    public void setClientReserva(Client clientReserva) {
        this.clientReserva = clientReserva;
    }

    public Farm getFarm() {
        return farm;
    }

    public void setFarm(Farm farm) {
        this.farm = farm;
    }

    
        
}
