const express = require('express');
const router = express.Router();
const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

router.get('/videos', async (req, res) => {
  const defaultAzureCredentials = new DefaultAzureCredential()
  blobService = new BlobServiceClient(
    "https://xperiencestore.blob.core.windows.net",
    defaultAzureCredentials
  )
  const containerClient = blobService.getContainerClient("tournaments")
  let i = 1;
  const videosDict = {}
  for await (const blob of containerClient.listBlobsFlat()) {
    const blobClient = containerClient.getBlobClient(blob.name)
    parts = blob.name.split("/")
    tournamentName = parts[0]
    game = parts[1].split(".")[0]
    if (!(tournamentName in videosDict)) {
      videosDict[tournamentName] = {
        tournamentName: tournamentName,
        games: []
      }
    }
    const video = {
      game: game,
      url: blobClient.url
    }
    videosDict[tournamentName].games.push(video)
    
  }
  res.send(200, Object.values(videosDict))
});

module.exports = router;