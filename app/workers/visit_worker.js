import VisitService from '../services/visit_service';
import queue, { Worker } from 'react-native-job-queue';
import NetInfo from "@react-native-community/netinfo";

export default class VisitWorker {
  static init() {
    if (!!queue.registeredWorkers["uploadVisit"])
      return;

    queue.addWorker(new Worker("uploadVisit", (payload) => {
      NetInfo.fetch().then(state => {
        if (!!state.isConnected);
          new VisitService().upload(payload.uuid);
      });
    }));
  }

  static performAsync(uuid) {
    queue.addJob("uploadVisit", { uuid: uuid }, {}, true);
  }
}