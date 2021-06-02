import UserService from '../services/user_service';
// import queueFactory from 'react-native-queue';
// import queue from 'react-native-job-queue';
// import { Worker } from 'react-native-job-queue';

export default class UserWorker {
  static async init() {
    // const queue = await queueFactory();
    // queue.addWorker('uploadUser', async (id, payload) => {
    //   UserService.upload(payload.uuid);
    // });
    // queue.addWorker(new Worker("uploadUser", async(payload) => {
    //   return UserService.upload(payload.uuid);
    // }))
  }

  static async performAsync(uuid) {
    // const queue = await queueFactory();
    // queue.createJob('uploadUser', { uuid: uuid }, {}, true);
    // queue.addJob("uploadUser", { uuid: uuid }, undefined, false);
  }
}

