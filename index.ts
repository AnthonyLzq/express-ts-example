import express, { Request } from 'express'

const app = express()
const PORT = 1996

// First approach
app.post('/api/v1', (req, res) => {
  const { body } = req
  const { foo } = body as { foo: string }

  res.status(200).send({
    foo,
    error: false
  })
})

// Second approach
type CustomParams = {
  [key: string]: string
}

type CustomBody = {
  foo: string
}

type CustomResponse = {
  foo: string
  error: boolean
}

app.post(
  '/api/v2',
  (req: Request<CustomParams, CustomResponse, CustomBody>, res) => {
    const { body: { foo } } = req

    res.status(200).send({
      foo,
      error: false
    })
  }
)

// Third approach
type CustomRequest<Body = unknown, Params = CustomParams, Response = CustomResponse> = Request<Params, Response, Body>

app.post('/api/v3', (req: CustomRequest<CustomBody>, res) => {
  const { body: { foo } } = req

  res.status(200).send({
    foo,
    error: false
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
