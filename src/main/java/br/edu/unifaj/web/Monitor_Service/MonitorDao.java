package br.edu.unifaj.web.Monitor_Service;

import lombok.Data;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Data
@Repository
public class MonitorDao {

    Map<Integer, Monitor> servico = new TreeMap<>();

    private int id = 3;


    public MonitorDao(){
        Monitor m1 = new Monitor(1, "LG ultrager 27", "VA", 24.0, 1000.0);
        Monitor m2 = new Monitor(2, "Samsung Odissey", "OLED", 45.0, 1500.0);
        servico.put(1, m1);
        servico.put(2, m2);
    }


    public List<Monitor> listar(){
        return new ArrayList(servico.values());
    }


    public Monitor obter(int id){
        return servico.get(id);
    }


    public Monitor incluir (Monitor m){
        m.setId(id++);
        servico.put(m.getId(), m);
        return m;
    }


    public Monitor alterar (Monitor m){
        servico.put(m.getId(), m);
        return m;
    }


    public void excluir (int id){
        servico.remove(id);
    }

}