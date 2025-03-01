package com.patrick.crud.api_crud.Controllers;


import com.patrick.crud.api_crud.Service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.patrick.crud.api_crud.Entity.Tarefas;
import java.util.List;


@RestController
@RequestMapping("/tarefas")
public class CrudController {

    @Autowired
    private TarefaService service;

    @GetMapping
    public List<Tarefas> listarTodas(){
        return service.listarTodas();
    }
    @PostMapping
    public Tarefas salvar(@RequestBody Tarefas tarefa){
        return service.salvar(tarefa);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id){
        service.deletar(id);
    }
}
