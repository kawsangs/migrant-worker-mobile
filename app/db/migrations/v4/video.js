const VideoSchema = {
  name: 'Video',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'string?',
    name: 'string',
    url: 'string',
    display_order: 'int',
    author: 'string?',
    tag: 'string?'
  }
}

export default VideoSchema;