import moment from 'moment';

export function normalizeActivity(item) {
    const startedAt = moment.unix(item.started_at);
    const endedAt = item.ended_at ? moment.unix(item.ended_at) : null;
    return {
        ...item,
        started_at: startedAt,
        ended_at: endedAt,
        started_ended_diff: endedAt ? moment.duration(endedAt.diff(startedAt)) : null,
    };
}
