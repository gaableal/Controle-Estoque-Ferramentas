const bcrypt = require('bcrypt');

async function testHashAndCompare() {
  // Defina uma senha para testar
  const senha = 'senhaSegura123';

  // Gera um hash para a senha
  const hashGerado = await bcrypt.hash(senha, 10);
  console.log("Hash gerado:", hashGerado);

  // Senhas para comparar (uma correta e uma incorreta)
  const senhaCorreta = 'senhaSegura123';
  const senhaErrada = 'senhaErrada456';

  // Comparando a senha correta com o hash gerado
  const resultadoCorreto = await bcrypt.compare(senhaCorreta, hashGerado);
  console.log("Comparando com senha correta:", resultadoCorreto); // Deve ser true

  // Comparando uma senha incorreta com o hash gerado
  const resultadoErrado = await bcrypt.compare(senhaErrada, hashGerado);
  console.log("Comparando com senha errada:", resultadoErrado);   // Deve ser false
}

// Executa a função de teste
testHashAndCompare().catch(err => console.error("Erro no teste:", err));
