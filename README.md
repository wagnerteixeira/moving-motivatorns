

for enable cors in firebase

[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]

Execute gsutil cors set cors.json gs://<your-cloud-storage-bucket>