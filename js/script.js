const taskContainer = document.querySelector('.tasks')

const daily = document.querySelector('.daily')
const weekly = document.querySelector('.weekly')
const monthly = document.querySelector('.monthly')

daily.style.color = 'var(--white)'

let selected = 'daily'
let currentTimeMensage 
let previousTimeMensage

window.addEventListener('DOMContentLoaded', () => {
     showCards()
})

function showCards(){
     fetch("../data.json")
          .then((data) => data.json())
          .then((info) => {
               let tasksCard = info.map((card) => {
                    if(selected === 'daily'){
                         currentTimeMensage = `${card.timeframes.daily.current}hrs`
                         previousTimeMensage = `Last Day - ${card.timeframes.daily.previous}hrs`
                    }
                    else if(selected === 'weekly'){
                         currentTimeMensage = `${card.timeframes.weekly.current}hrs`
                         previousTimeMensage = `Last Week - ${card.timeframes.weekly.previous}hrs`
                    }
                    else{
                         currentTimeMensage = `${card.timeframes.monthly.current}hrs`     
                         previousTimeMensage = `Last Month - ${card.timeframes.monthly.previous}hrs`
                    }
                         
                    return `
                         <section class="task ${card.class}">
                              <section class="img">
                                   <img src="images/icon-${card.class}.svg" alt="">
                              </section>
                              <section class="info">
                                   <h1>${card.title}<img src="images/icon-ellipsis.svg" alt=""></h1>
                                   <section class="text-times">
                                        <p class="current-time">${currentTimeMensage}</p>
                                        <p class="previous-time">${previousTimeMensage}</p>
                                   </section>
                              </section>
                         </section>
                    `
               }).join('')
               
               taskContainer.innerHTML = tasksCard
          })
          .catch((err) => {
               console.log(` error: ${err}`)
          })

}

daily.addEventListener('click', () => {
     selected = 'daily'
     weekly.style.color = 'var(--pale-blue)'
     monthly.style.color = 'var(--pale-blue)'
     daily.style.color = 'var(--white)'
     showCards()
})

weekly.addEventListener('click', () => {
     selected = 'weekly'
     daily.style.color = 'var(--pale-blue)'
     monthly.style.color = 'var(--pale-blue)'
     weekly.style.color = 'var(--white)'
     showCards()
})

monthly.addEventListener('click', () => {
     selected = 'monthly'
     daily.style.color = 'var(--pale-blue)'
     weekly.style.color = 'var(--pale-blue)'
     monthly.style.color = 'var(--white)'
     showCards()
})