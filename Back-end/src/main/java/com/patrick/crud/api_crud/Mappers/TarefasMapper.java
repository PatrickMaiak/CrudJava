package com.patrick.crud.api_crud.Mappers;

import com.patrick.crud.api_crud.Dtos.TarefasDto;
import com.patrick.crud.api_crud.Entity.Tarefas;
import org.springframework.stereotype.Service;

@Service
public class TarefasMapper {

    public static TarefasDto toDto(Tarefas tarefas){

        return new TarefasDto(tarefas.getId(), tarefas.getTitulo(),tarefas.getDescricao(),tarefas.isAtivo(),tarefas.getCreationTimestamp(),tarefas.getCreationTimestamp());

    }

    public static Tarefas toEntity(TarefasDto tarefasDto) {
        return new Tarefas(tarefasDto.id(), tarefasDto.titulo(),tarefasDto.descricao(),tarefasDto.ativo(),tarefasDto.creationTimestamp(),tarefasDto.updateTimestamp());
    }
}
