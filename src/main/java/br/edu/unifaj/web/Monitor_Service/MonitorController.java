package br.edu.unifaj.web.Monitor_Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class MonitorController {

    // inclue o DAO
    @Autowired MonitorDao dao;

    @GetMapping("api/monitor")
    public List<Monitor> listar (){
        return dao.listar();
    }


    @GetMapping("api/monitor/{id}")
    public Monitor obter (@PathVariable int id){
        return dao.obter(id);
    }


    @PostMapping("api/monitor")
    public Monitor incluir (@RequestBody Monitor m){
        return dao.incluir(m);
    }


    @PutMapping("api/monitor")
    public Monitor alterar (@RequestBody Monitor m){
        return dao.alterar(m);
    }


    @DeleteMapping("api/monitor/{id}")
    public void excluir (@PathVariable int id){
        dao.excluir(id);
    }
}