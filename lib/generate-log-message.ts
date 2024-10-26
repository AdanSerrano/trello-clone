import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
    const { action, entityTitle, entityType } = log;

    switch (action) {
        case ACTION.CREATED:
            return `created ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTION.UPDATED:
            return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTION.DELETED:
            return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
        default:
            return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`;

    }
}