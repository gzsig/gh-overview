import { NowRequest, NowResponse } from '@now/node'

export default (req: NowRequest, res: NowResponse) => {
  const { name = 'World' } = req.query
  res.json({data:`Hello ${name}!`})
}