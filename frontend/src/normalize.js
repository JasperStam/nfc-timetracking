import moment from 'moment';
moment.locale('en-gb');

export function normalizeActivity(item) {
    const startedAt = moment(item.started_at);
    const endedAt = item.ended_at ? moment(item.ended_at) : null;
    const ended = endedAt || moment();
    return {
        ...item,
        started_at: startedAt,
        ended_at: endedAt,
        started_ended_diff: moment.duration(ended.diff(startedAt)),
    };
}
