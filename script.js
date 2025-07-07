{
  "app_name": "Assistente Quadro de Cargas",
  "description": "Aplicativo para auxiliar técnicos e engenheiros no dimensionamento de quadros de cargas residenciais conforme NBR 5410.",
  "screens": [
    {
      "name": "Tela Inicial",
      "components": [
        { "type": "text", "content": "Bem-vindo ao Assistente de Quadro de Cargas" },
        { "type": "button", "label": "Novo Projeto", "action": "navigate_to:CadastroProjeto" },
        { "type": "button", "label": "Projetos Salvos", "action": "navigate_to:ListaProjetos" }
      ]
    },
    {
      "name": "CadastroProjeto",
      "components": [
        { "type": "input", "label": "Nome do Projeto", "id": "nome_projeto" },
        { "type": "input", "label": "Área total da residência (m²)", "id": "area_total", "input_type": "number" },
        { "type": "button", "label": "Avançar", "action": "navigate_to:DefinirAmbientes" }
      ]
    },
    {
      "name": "DefinirAmbientes",
      "components": [
        { "type": "repeater", "label": "Ambientes", "items": [
            {
              "type": "input", "label": "Nome do cômodo", "id": "comodo_nome" },
              { "type": "input", "label": "Área (m²)", "id": "comodo_area", "input_type": "number" }
            ]
        },
        { "type": "button", "label": "Próximo: Cargas e Tomadas", "action": "navigate_to:ConfigurarCargas" }
      ]
    },
    {
      "name": "ConfigurarCargas",
      "components": [
        { "type": "dropdown", "label": "Tipo de Carga", "options": ["Iluminação", "TUG", "TUE", "Chuveiro", "Ar-condicionado"], "id": "tipo_carga" },
        { "type": "input", "label": "Potência (W)", "id": "potencia", "input_type": "number" },
        { "type": "checkbox", "label": "Usar recomendação da NBR 5410", "id": "usar_nbr" },
        { "type": "button", "label": "Adicionar carga", "action": "add_carga" },
        { "type": "button", "label": "Gerar Quadro de Cargas", "action": "navigate_to:QuadroFinal" }
      ]
    },
    {
      "name": "QuadroFinal",
      "components": [
        { "type": "table", "columns": ["Circuito", "Descrição", "VA", "Corrente (A)", "Disjuntor", "Bitola (mm²)"], "data_source": "quadro_cargas" },
        { "type": "button", "label": "Exportar PDF", "action": "export_pdf" },
        { "type": "button", "label": "Voltar ao início", "action": "navigate_to:Tela Inicial" }
      ]
    }
  ],
  "data_logic": [
    {
      "id": "add_carga",
      "action": "append_to_table",
      "target": "quadro_cargas",
      "values": {
        "Circuito": "gerado automaticamente",
        "Descrição": "$tipo_carga",
        "VA": "$potencia",
        "Corrente (A)": "potencia / 127",
        "Disjuntor": "selecionar_disjuntor(potencia)",
        "Bitola (mm²)": "selecionar_bitola(potencia)"
      }
    },
    {
      "id": "export_pdf",
      "action": "generate_pdf",
      "source": "quadro_cargas",
      "filename": "quadro_de_cargas_nbr5410.pdf"
    }
  ]
}
