import { createContext } from 'react';
import { ColumnProps } from './Column';

export const CurrentColumnDraggedContext = createContext<
    [ColumnProps | null, (c: ColumnProps | null) => void]
>([null, () => {console.log('plop')}]);
