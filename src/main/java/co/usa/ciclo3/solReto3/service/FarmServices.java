package co.usa.ciclo3.solReto3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.usa.ciclo3.solReto3.model.Farm;
import co.usa.ciclo3.solReto3.repository.FarmRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FarmServices {
    
    @Autowired
    private FarmRepository farmRepository;

    public List<Farm> getAll(){
        return farmRepository.getAll();
    }

    public Optional<Farm> getFarm(int id){
        return farmRepository.getFarm(id);
    }

    public Farm save(Farm p){
        if(p.getId()==null){
            return farmRepository.save(p);
        }else{
            Optional<Farm> paux=farmRepository.getFarm(p.getId());
            if(paux.isEmpty()){
                return farmRepository.save(p);
            }else{
                return p;
            }
        }
    }
}
