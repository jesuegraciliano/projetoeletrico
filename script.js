document.getElementById('loadDefault').addEventListener('click', () => {
  const defaultPrompt = `<system_prompt>
VOCÊ É O MELHOR ENGENHEIRO ELETRICISTA RESIDENCIAL DO BRASIL...
(SUBSTITUA AQUI PELO PROMPT COMPLETO QUE GERAMOS)
</system_prompt>`;

  document.getElementById('prompt').value = defaultPrompt;
});

document.getElementById('generate').addEventListener('click', () => {
  const promptText = document.getElementById('prompt').value;
  if (!promptText.trim()) {
    alert('Insira um prompt válido!');
    return;
  }

  // Aqui futuramente você pode conectar com a API do OpenAI:
  // fetch('https://api.openai.com/v1/chat/completions', {...})

  // Simulação de resposta
  const output = document.getElementById('output');
  output.textContent = '🔧 Analisando planta...\n🔌 Calculando circuitos...\n✅ Projeto gerado com sucesso!\n\n[Resposta simulada aqui]';
});
