package com.patrick.crud.api_crud.Entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.lang.reflect.Constructor;
import java.time.Instant;

@Entity
@Table(name = "tarefas")

public class Tarefas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;
    @Column(name = "titulo")
    private String titulo;
    @Column(name = "descricao")
    private String descricao;
    @Column(name = "ativo")
    private boolean ativo;

    @CreationTimestamp
    private Instant creationTimestamp;
    @UpdateTimestamp
    private Instant updateTimestamp;

    public Tarefas() {
    }

    public Tarefas(int id, String titulo, String descricao, boolean ativo, Instant creationTimestamp, Instant updateTimestamp) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.ativo = ativo;
        this.creationTimestamp = creationTimestamp;
        this.updateTimestamp = updateTimestamp;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public Instant getCreationTimestamp() {
        return creationTimestamp;
    }

    public void setCreationTimestamp(Instant creationTimestamp) {
        this.creationTimestamp = creationTimestamp;
    }

    public Instant getUpdateTimestamp() {
        return updateTimestamp;
    }

    public void setUpdateTimestamp(Instant updateTimestamp) {
        this.updateTimestamp = updateTimestamp;
    }
}
