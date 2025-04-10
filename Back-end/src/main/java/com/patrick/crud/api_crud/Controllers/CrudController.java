package com.patrick.crud.api_crud.Controllers;


import com.patrick.crud.api_crud.Dtos.TarefasDto;
import com.patrick.crud.api_crud.Entity.Tarefas;
import com.patrick.crud.api_crud.Mappers.TarefasMapper;
import com.patrick.crud.api_crud.Service.TarefaService;

import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/tarefas")
public class CrudController {

    @Autowired
    private TarefaService service;
    @Autowired



    @GetMapping
    public List<TarefasDto> listarTodas(){

        return  service.listarTodas().stream().map(TarefasMapper::toDto).toList();

    }
    @PostMapping
    public ResponseEntity<TarefasDto> salvar(@RequestBody TarefasDto tarefa){

        try { Tarefas tarefaDetails = TarefasMapper.toEntity(tarefa);

            Tarefas tarefasSaved = service.salvar(tarefaDetails);

            return new ResponseEntity<TarefasDto>(TarefasMapper.toDto(tarefasSaved), HttpStatus.OK);

        }
        catch (Exception e){
            return  new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }


    @PutMapping("/{id}/edit")
    public TarefasDto editar(@PathVariable Integer id, @RequestBody TarefasDto tarefasDto){
        Tarefas tarefasDetail = TarefasMapper.toEntity(tarefasDto);
        Tarefas tarefasUpadated = service.editar(id,tarefasDetail);

        return TarefasMapper.toDto(tarefasUpadated);
    }
    @PutMapping("/{id}/status")
    public  Tarefas alterarStatus(@PathVariable Integer id){

        return service.alterarStatus(id);

    }



    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id){
        service.deletar(id);
    }
}
