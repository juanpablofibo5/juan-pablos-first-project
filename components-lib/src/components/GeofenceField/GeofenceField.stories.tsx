import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { GeofenceField } from "./GeofenceField";
import type { GeofenceFieldProps, GeofenceValue } from "./types";

// Wrapper que mantiene el estado (el componente es controlado).
function Demo({ value: initial, ...args }: GeofenceFieldProps) {
  const [value, setValue] = useState<GeofenceValue>(initial);
  return <GeofenceField {...args} value={value} onChange={setValue} />;
}

const base: GeofenceValue = { lat: 20.9674, lng: -89.6237, radio: 200 };

const meta: Meta<typeof GeofenceField> = {
  title: "Klockk/GeofenceField",
  component: GeofenceField,
  parameters: { layout: "padded" },
  render: (args) => <Demo {...args} />,
};
export default meta;
type Story = StoryObj<typeof GeofenceField>;

// Interactivo: cubre "arrastrando el pin" y "ajustando radio".
export const Interactivo: Story = { args: { value: base } };

export const Deshabilitado: Story = { args: { value: base, disabled: true } };

// Valor inválido: radio fuera del rango permitido (20–1000).
export const ValorInvalido: Story = { args: { value: { ...base, radio: 1500 } } };

export const ModoOscuro: Story = { args: { value: base, theme: "dark" } };
