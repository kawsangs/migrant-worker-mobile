import VisitService from '../services/visit_service';
import queue, { Worker } from 'react-native-job-queue';

export default class VisitWorker {
  static init() {
    if (!!queue.registeredWorkers["uploadVisit"])
      return;

    queue.addWorker(new Worker("uploadVisit", (payload) => {
      new VisitService().upload(payload.uuid);
    }));
  }

  static performAsync(uuid) {
    queue.addJob("uploadVisit", { uuid: uuid }, {}, true);
  }
}