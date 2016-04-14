import moment from 'moment';

export function normalizeActivity(item) {
    const startedAt = moment.unix(item.started_at);
    const endedAt = moment.unix(item.ended_at);
    window.aa = moment.duration(endedAt.diff(startedAt));
    window.moment = moment;
    return {
        ...item,
        started_at: startedAt,
        ended_at: endedAt,
        started_ended_diff: moment.duration(endedAt.diff(startedAt)),
    };
}
