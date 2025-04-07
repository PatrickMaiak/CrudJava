package com.patrick.crud.api_crud.Service;

import com.patrick.crud.api_crud.Entity.Tarefas;
import com.patrick.crud.api_crud.Repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarefaService {
    @Autowired
    private TarefaRepository repository;

    public List<Tarefas> listarTodas(){
        return repository.findAll();
    }
    public Tarefas salvar(Tarefas tarefa){
        return repository.save(tarefa);
    }

    public Tarefas editar(Integer id, Tarefas tarefa){
        Tarefas tarefaUpadate = repository.getReferenceById(id);

        tarefaUpadate.setTitulo(tarefa.getTitulo());
        tarefaUpadate.setDescricao(tarefa.getDescricao());
        tarefaUpadate.setAtivo(tarefa.isAtivo());
        tarefaUpadate.setUpdateTimestamp(tarefa.getUpdateTimestamp());
        tarefaUpadate.setUpdateTimestamp(tarefa.getCreationTimestamp());
        return repository.save(tarefaUpadate);

    }

    public Tarefas alterarStatus(Integer id){
        Tarefas tarefaStatus = repository.getReferenceById(id);
        tarefaStatus.setAtivo(!tarefaStatus.isAtivo());
        return repository.save(tarefaStatus);
    }
    public void deletar(Integer id){
        repository.deleteById(id);
    }
}
