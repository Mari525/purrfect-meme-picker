import { catsData } from './/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const isGifCheckbox = document.getElementById('is-gif-checkbox')
const getImageBtn = document.getElementById('get-image-btn')
const catImage = document.getElementById('cat-image')
const modal = document.getElementById('modal')
const closeBtn = document.getElementById('close-btn')
const overlay = document.getElementById('overlay')
const body = document.getElementById('body')

getImageBtn.addEventListener('click', renderCat)
closeBtn.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

function renderCat() {
  const catObject = getCatObject()
  catImage.innerHTML = `<img
                          class="modal__img"
                          src="../img/${catObject.image}" 
                          alt="A cat looking ${catObject.alt}"
                        >`
  modal.classList.add('modal__show')
  overlay.classList.add('overlay__show')
  body.classList.add('body__scroll')
}

function getCatObject() {
  const catsArray = getCatsArray()
  const randomCat = Math.floor(Math.random() * catsArray.length)
  return catsArray[randomCat]
} 

function getCatsArray() {
  const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
  const isChecked = isGifCheckbox.checked
  const catsArray = catsData.filter(function(cat){
    if (isChecked) {
      return cat.emotionTags.includes(selectedEmotion) && cat.isGif
    }
    return cat.emotionTags.includes(selectedEmotion)
  })
  return catsArray
}

function getEmotionsArray(cats) {
  let emotionsArray = []
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion)
      }
    }
  }
  return emotionsArray
}

function closeModal() {
  modal.classList.remove("modal__show")
  overlay.classList.remove('overlay__show')
  body.classList.remove('body__scroll')
}

function renderRadios(cats) {
  let radioItems = ""
  const emotions = getEmotionsArray(cats)
  for (let emotion of emotions) {
    radioItems += `
                    <li class="form__item">
                      <input type="radio" 
                        id="${emotion}"
                        name="radio"
                        value="${emotion}"
                        class="form__radio"
                        >
                      <label for="${emotion}" class="form__label" >${emotion}</label>
                    </li>
                  `
  }
  emotionRadios.innerHTML = radioItems
}

renderRadios(catsData)