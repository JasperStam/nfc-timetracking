import moment from 'moment';

export function normalizeActivity(item) {
    const startedAt = moment.unix(item.started_at);
    const endedAt = item.ended_at ? moment.unix(item.ended_at) : null;
    const ended = endedAt || moment.unix(item.now);
    moment.locale('en-gb');
    return {
        ...item,
        started_at: startedAt,
        ended_at: endedAt,
        started_ended_diff: moment.duration(ended.diff(startedAt)),
    };
}
