import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api/index.js';

dotenv.config();
const { PORT, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, { useNewUrlParser: true}).then(() =>{
  console.log('Connected to MongoDb')
})
.catch( e => {
  console.error(e);
})

const app = new Koa();
const router = new Router();

//첫번쨰 파라미터 경로, 두번쨰 파라미터 라우트에 적용할 미들웨어 함수
// router.get('/', (ctx) => {
//   ctx.body = 'home';
// });

router.use('/api', api.routes());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port '+ port );
});
