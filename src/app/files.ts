export type FileName = {
  name: string;
  media: "video"|"image"|"document"
  files?: FileName[];
}

export const files:FileName[] = [
  {
    media:"video",
    name:"vid1.mp4",
  },
  {
    media:"video",
    name:"topic1",
    files:[
      {
        media:"video",
        name:"vid2.mp4"
      }
    ]
  }
]