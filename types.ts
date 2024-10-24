import { Card, List } from "@prisma/client";

export type ListWithCard = List & { Card: Card[] };
export type CardWithList = Card & { List: List };