export namespace Terms {
  export type Type =
    'statExpression' |
    'logicalExpression' |
    'notExpression' |
    'ivRange' |
    'unboundedRange' |
    'boundedRange';

  export interface ComplexTerm {
    type: Type;
  }

  export interface StatExpression extends ComplexTerm {
    type: 'statExpression';
    stat: string;
    expression: Range;
  }

  export interface LogicalExpression extends ComplexTerm {
    type: 'logicalExpression';
    operator: '||' | '&&';
    left: Expression;
    right: Expression;
  }

  export interface NotExpression extends ComplexTerm {
    type: 'notExpression';
    expression: Expression;
  }

  export type Expression = StatExpression | LogicalExpression | NotExpression;

  export type IVRangeSegment = RangeSegment | '#' | 'x' | 'X';
  
  export interface UnboundedRange extends ComplexTerm {
    type: 'unboundedRange';
    value: number;
    operator: '+' | '-';
  }

  export interface BoundedRange extends ComplexTerm {
    type: 'boundedRange';
    from: number;
    to: number;
  }

  export type RangeSegment = UnboundedRange | BoundedRange | number;

  export interface IVRange extends ComplexTerm {
    type: 'ivRange';
    negative: IVRangeSegment;
    neutral: IVRangeSegment;
    positive: IVRangeSegment;
  }
  
  export type Range = IVRange | RangeSegment;
  
  export type Term = Expression | Range;
}

export function parse(content: string): Terms.Expression;