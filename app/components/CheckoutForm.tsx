'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import formatPrice from '@/util/PriceFormat';

export default function CheckoutForm() {
  return (
    <form id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <h1>Total :</h1>
      <button id="submit" disabled={isLoading || !stripe || !elements}></button>
    </form>
  );
}
