package br.edu.unifaj.web.Monitor_Service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Monitor {
    private int id;
    private String nome;
    private String tipo;
    private double tamanho;
    private double preco;
}