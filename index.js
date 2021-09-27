var words = [
    'Oceania',
    'animal',
    'abacaxi',
    'Bolsa',
    'barack obama',
    'cesta',
    'taco',
    'barco',
    'caixa',
    'fotografia',
    'vela',
    'carro',
    'gato',
    'China',
    'Natal',
    'nuvens',
    'teia de aranha',
    'codepen',
    'plano',
    'computador',
    'vaqueiro',
    'colher',
    'Dinamarca',
    'Disney',
    'cachorro',
    'Pato Donald',
    'porta',
    'desenhando',
    'bateria',
    'ouvidos',
    'ovos de pascoa',
    'ovo',
    'elon musk',
    'Inglaterra',
    'Europa',
    'olhos',
    'enfrentar',
    'Facebook',
    'futebol americano',
    'fortnite',
    'França',
    'Universo',
    'jogos',
    'Alemanha',
    'Google',
    'Inglaterra',
    'Violoncello',
    'hacker',
    'carrasco',
    'rosto',
    'fones de ouvido',
    'feriado',
    'cavalo',
    'casa',
    'China',
    'Hungria',
    'gelatina',
    'passatempo',
    'cozinha',
    'abajur',
    'limonada',
    'carta',
    'luz',
    'tocha',
    'telegrama',
    'mario',
    'melodia',
    'Mickey Mouse',
    'microondas',
    'Minecraft',
    'mini jogo',
    'mouse',
    'boca',
    'filme',
    'música',
    'Noruega',
    'nariz',
    'laranja',
    'tanques',
    'quadro',
    'bermuda',
    'papel',
    'Paz',
    'caneta',
    'lapiseira',
    'gato',
    'Felipe Neto',
    'piano',
    'plano',
    'Holanda',
    'presente',
    'programa',
    'programador',
    'perguntas',
    'programa',
    'controle remoto',
    'foguete',
    'Congo',
    'escola',
    'Irlanda',
    'tela',
    'assento',
    'sapatos',
    'terra',
    'Smartphone',
    'cobra',
    'nave espacial',
    'caixas de som',
    'Guerra das Estrelas',
    'mala',
    'primavera',
    'sol',
    'Super heroi',
    'agasalho',
    'Noruega',
    'computador',
    'Ferramentas',
    'Guatemala',
    'universo',
    'usain bolt',
    'vampiro',
    'quadro em branco',
    'Vila',
    'wales',
    'garrafa',
    'vento',
    'moinho de vento',
    'janela',
    'inverno',
    'bruxo',
    'palavra',
    'xilofone',
    'Youtube',
    'zumbi'
  ];
  var hangman = [
    {from: [70, 38], to: [72, 46]},
    {from: [70, 38], to: [68, 46]},
    {from: [70, 45], to: [72, 55]},
    {from: [70, 45], to: [68, 55]},
    {from: [70, 35], to: [70, 45]},
    {circle: [70, 30], radius: 2},
    {from: [70, 5], to: [70, 25]},
    {from: [30, 5], to: [70, 5]},
    {from: [30, 95], to: [30, 5]},
    {from: [1, 95], to: [99, 95]}
  ];
  
  // get stats
  var stats = {streak: 0, scores: []};
  if (typeof(Storage) !== "undefined") {
    if (localStorage.hangman !== undefined) {
      stats = JSON.parse(localStorage.hangman);
      setScore();
    }
  }
  
  var word, currentWord, guessesLeft, guessed;
  generateWord();
  function generateWord() {
    currentWord = [], guessesLeft = 10, guessed = [];
    document.querySelector('.guessesLeft').querySelector('span').innerHTML = guessesLeft;
    document.querySelector('.guessed').querySelector('span').innerHTML = '';
    document.querySelector('input').style.display = null;
    document.querySelector('button').style.display = 'none';
    document.querySelector('.hangman').innerHTML = '';
    word = words[Math.floor(Math.random() * words.length)];
    console.log(word);
    let html = '';
    for (let i = 0; i < word.length; i++) {
      if (word[i] == ' ') {
        currentWord[i] = word[i];
        html += '<span class="hidden" style="border:none;"></span>';
      } else html += '<span class="hidden"></span>';
    }
    document.querySelector('.word').innerHTML = html;
  }
  
  // check input
  document.querySelector('input').addEventListener('change', function() {
    if (this.value !== "" && this.value !== " ") {
      if (this.value.length > 1) {
        if (this.value.length !== word.length) alert('Seu palpite não tem o mesmo comprimento da palavra! :p');
        else if (this.value == word) {
          for (let i = 0; i < word.length; i++) {
            document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
          }
          finish();
        }
        else {
          drawHangman();
          drawHangman();
          fadeColor('#ff2929');
        }
      } else if (this.value.match(/^[A-Za-z]+$/)) {
        let alreadyGuessed = false;
        for (let i = 0; i < guessed.length; i++) {
          if (guessed[i] === this.value.toLowerCase()) {
            alreadyGuessed = true;
            break;
          }
        }
        if (!alreadyGuessed) {
          guessed.push(this.value.toLowerCase());
          let wordHasLetter = false;
          for (let i = 0; i < word.length; i++) {
            if (word[i] === this.value.toLowerCase()) {
              wordHasLetter = true;
              document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
              currentWord[i] = word[i];
            }
          }
          if (!wordHasLetter) {
            fadeColor('#ff2929');
            drawHangman();
            let guessedElem = document.querySelector('.guessed').querySelector('span');
            if (guessedElem.innerHTML == '') guessedElem.innerHTML = this.value.toUpperCase();
            else guessedElem.innerHTML += ', ' + this.value.toUpperCase();
          } else fadeColor('#35c435');
        } else alert('Você já adivinhou essa letra! :)');
        if (currentWord.join('') === word) finish();
      } else alert('Por favor, adivinhe apenas letras ;(');
      this.value = '';
      if (guessesLeft <= 0) {
        guessesLeft = 0;
        for (let i = 0; i < word.length; i++) {
          if (document.querySelector('.word').querySelectorAll('span')[i].innerHTML == '') {
            document.querySelector('.word').querySelectorAll('span')[i].style.color = 'red';
            document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
          }
        }
        // fadeColor('#ff2929');
        alert('PERDEMO!');
        document.querySelector('input').style.display = 'none';
        document.querySelector('button').style.display = null;
        stats.streak = 0;
        stats.scores.push(0);
        setScore();
      }
      document.querySelector('.guessesLeft').querySelector('span').innerHTML = guessesLeft;
    }
  });
  
  function fadeColor(color) {
    document.body.style.background = color;
    setTimeout(function() {
      document.body.style.background = null;
    }, 200);
  }
  
  function finish() {
    var wrongGuesses = (10 - guessesLeft);
    // var rightGuesses = guessed.length - wrongGuesses;
    var rightGuesses = word.length;
    let score = Math.floor((rightGuesses / (wrongGuesses + rightGuesses)) * 100) || 100;
    alert('Parabéns! Pontuação: ' + score + '% U.u');
    stats.streak++;
    stats.scores.push(score);
    setScore();
    
    fadeColor('lightblue');
    document.querySelector('input').style.display = 'none';
    document.querySelector('button').style.display = null;
  }
  
  // play again
  document.querySelector('button').addEventListener('click', generateWord);
  
  function setScore() {
    let score = '-';
    for (let i = 0; i < stats.scores.length; i++) {
      if (score == '-') score = 0;
      score += stats.scores[i];
    }
    if (score !== '-') score = Math.floor(score / stats.scores.length) + '%';
    document.querySelector('.streak').innerHTML = stats.streak;
    document.querySelector('.score').innerHTML = score;
    localStorage.hangman = JSON.stringify(stats);
  }
  
  function drawHangman() {
    guessesLeft--;
    let part = hangman[guessesLeft];
    
    let hangmanLines = document.querySelector('.hangman').querySelectorAll('svg');
    for (let i = 0; i < hangmanLines.length; i++) {
      hangmanLines[i].children[0].classList.remove('draw');
    }
    
    let svg;  
    if (part.circle == undefined) {
      svg = '<svg><line class="draw" x1="' + part.from[0] + '%" y1="' + part.from[1] + '%" x2="' + part.to[0] + '%" y2="' + part.to[1] + '%"/></svg>';
    } else {
      svg = '<svg><circle class="draw" cx="' + part.circle[0] + '%" cy="' + part.circle[1] + '%" r="' + part.radius + '%"/></svg>';
    }
    
    document.querySelector('.hangman').innerHTML += svg;
  }
  window.alert("Bem vindo ao jogo da forca!")
  