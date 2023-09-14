import fs from "fs" //Biblioteca para manipular os arquivos nos diretorios
import wav from "node-wav" //Biblioteca para converter o áudio
import ffmpeg from "fluent-ffmpeg" //para manipular o áudio
import ffmpegStatic from "ffmpeg-static"

const filePath = "./tmp/audio.mp4"
const outputPath = filePath.replace(".mp4", ".wav")

export const convert = () => new
  Promise((resolve, reject) => {
    console.log("convertendo o video..")

    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
      .input(filePath) // diretorio do áudio
      .audioFrequency(16000)
      .audioChannels(1)
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outputPath)
        const fileDecoded = wav.decode(file)

        const audioData = fileDecoded.channelData[0]

        // Convertendo os dados do áudio para o formato aceito pela IA
        const floatArray = new Float32Array(audioData)

        console.log("Vídeo convertido com sucesso!")
        resolve(floatArray)

        // Remover o arquivo do diretorio
        fs.unlinkSync(outputPath)
      })
      .on("error", (error) => {
        console.log("Erro ao converter o vídeo", error)
        reject(error)
      })
      .save(outputPath)
  })