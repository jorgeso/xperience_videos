import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlobServiceClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'xperience_videos';
  blobService: BlobServiceClient;
  constructor(){
    const defaultAzureCredentials = new DefaultAzureCredential()
    this.blobService = new BlobServiceClient(
      "https://xperiencestore.blob.core.windows.net",
      defaultAzureCredentials
    )
  }
  async ngOnInit(){
    const containerClient = this.blobService.getContainerClient("tournaments")
    let i = 1;
    for await (const blob of containerClient.listBlobsFlat()) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }

  }
}
