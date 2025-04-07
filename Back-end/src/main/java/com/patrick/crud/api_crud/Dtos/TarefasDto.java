package com.patrick.crud.api_crud.Dtos;


import java.time.Instant;


public record TarefasDto(int id, String titulo, String descricao, boolean ativo, Instant creationTimestamp, Instant updateTimestamp){

}

