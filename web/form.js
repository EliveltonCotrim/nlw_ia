import { server } from "./server.js";

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event)=> {
  event.preventDefault()
  content.classList.remove("placholder")

  const videoUrl = input.value

  if(!videoUrl.includes("shorts")){
    return content.textContent = "Este vídeo não parace ser um short. Tente novamente"
  }

  const [_, params] = videoUrl.split("/shorts/")
  const [videoId] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})