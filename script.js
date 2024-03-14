const btn = document.querySelector('.btn');

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    console.log('Eu sou o Enter');
  }
})

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    executaAcao();
  }
});


btn.addEventListener('click', function() {
  executaAcao();
})


function executaAcao() {
  const uf = document.querySelector('.uf').value;
  const cid = document.querySelector('.cid').value;
  const log = document.querySelector('.log').value;
  AchaLocal(uf, cid, log);
}

function AchaLocal(uf, cidade, logradouro) {

  const url = `https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar CEP');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      if (data.length === 0) {
        console.error('CEP não encontrado para o logradouro informado');
        return;
      }

      const listaCeps = document.querySelector('.listaCeps');

      listaCeps.innerHTML = '';

      data.forEach(cep => {
        const itemCep = document.createElement('li');

        itemCep.innerHTML = `<div style="margin-bottom: 10px;">
                             CEP: ${cep.cep}<br>
                             Logradouro: ${cep.logradouro}<br>
                             Bairro: ${cep.bairro}<br>
                             Cidade: ${cep.localidade}<br>
                             UF: ${cep.uf}<br>
                             </div>`;

        listaCeps.appendChild(itemCep);
      });

      // Aqui você pode manipular os dados do CEP como quiser
      // console.log(`CEP: ${data.cep}`);
      // console.log(`Logradouro: ${data.logradouro}`);
      // console.log(`Complemento: ${data.complemento}`);
      // console.log(`Bairro: ${data.bairro}`);
      // console.log(`Localidade: ${data.localidade}`);
      // console.log(`UF: ${data.uf}`);

      document.querySelector('.endereco').innerHTML = `Seu possivel CEP: ${data[0].cep}`;
      document.querySelector('.bairro').innerHTML = `Seu bairro: ${data[0].bairro}`;
      document.querySelector('.localidade').innerHTML = `Sua UF: ${data[0].uf}`;

    })
    .catch(error => {
      console.error('Erro:', error);
    });

}