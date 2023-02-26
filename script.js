'use strict';

//selecting elements
//bir elementi seçmenin iki farklı yöntemi vardır ikiside tmelde aynı işi yapar
const score0Elm = document.querySelector('#score--0');
const score1Elm = document.getElementById('score--1');
const diceElm = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0Elm = document.getElementById('current--0');
const current1Elm = document.getElementById('current--1');
const player0Elm = document.querySelector('.player--0');
const player1Elm = document.querySelector('.player--1');

let currentScore,scores,activePlayer,playing;

const init = function()
{
//start conditions

diceElm.classList.add('hidden');
//ilkbaşta skoru 0 yapıyoruz
 currentScore = 0;
//Rolling adice function
 scores = [0,0];
//activeplayer
 activePlayer = 0;
 playing = true;

score0Elm.textContent =0;
score1Elm.textContent =0;
current0Elm.textContent =0;
current1Elm.textContent =0;
player0Elm.classList.remove('player--winner');
player1Elm.classList.remove('player--winner');
player1Elm.classList.remove('player--active');
player0Elm.classList.add('player--active');
}

init();

const switchPlayer = function(){
        //switch to next player
        //actif oyuncuyu çağırıyoruz
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        //skoru 0 a eşitliyoruz
        currentScore =0;
        //aktif oyuncuyu değiştiriyoruz
        activePlayer = activePlayer === 0 ? 1 : 0;
        //oyuncu değiştiğinde arkaplandaki açık rengin diğer oyuncunun üzerine geçmesini istiyoruz
        //sınıf listesi özelliğini kullanabilen başka bir yöntem kullanalım
        //add-remove metodlarını kullandık bu seferde toggle metodunu kullanalım
        //toggle metodu eğer class orada değilse çağırdığımız classı ekler orada isede çıkarır
        player0Elm.classList.toggle('player--active');
        player1Elm.classList.toggle('player--active');
}

btnRoll.addEventListener('click',function(){
    if(playing)
    {
        //1.generating a random dice roll
    //random olarak 0-6 aralığında sayı oluşturuyoruz
    const dice = Math.trunc(Math.random()*6)+1;
    console.log(dice)

    //2.display dice
    diceElm.classList.remove('hidden');
    //src ile arama işiniyapıyoruz `dice-3` geldğinde 3 numaralı png gelecek
    diceElm.src = `dice-${dice}.png`;
    
    //3.check for rolled 1:if true, 
    if(dice!==1){
    //Add dice to current score
        //zarları topluyoruz
        currentScore += dice;
        //skoru aktif oyuncunun textine yazıyoruz
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        //current0Elm.textContent = currentScore; 
    }
    else
    {
       switchPlayer();
    }
    }
});


btnHold.addEventListener('click',function(){
    if(playing)
    {
    //1.Add current score to active player score
    scores[activePlayer] += currentScore; 
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


    //2.Check if player's score is>=100
    if(scores[activePlayer] >=100){
        playing = false;
        diceElm.classList.add('hidden');

        //FinishGame
        //sınıf seçiciyi kullandığınızda gerçek bir seçiciye ihtiyacınız vardır
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    }
    else{
        //switch to the next player
        switchPlayer(); 
    }
}
    
})


btnNew.addEventListener('click',init);
