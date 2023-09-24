import React, { ReactNode } from 'react';
import { Alert } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';

interface Props {
  children: ReactNode;
  variant?: Variant;
}

export default function Message({ children, variant = 'info' }: Props) {
  return <Alert variant={variant}>{children}</Alert>;
}
