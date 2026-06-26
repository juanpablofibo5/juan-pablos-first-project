import type { Meta, StoryObj } from "@storybook/react-vite";
import { OvertimeMeter } from "./OvertimeMeter";

const meta: Meta<typeof OvertimeMeter> = {
  title: "Klockk/OvertimeMeter",
  component: OvertimeMeter,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof OvertimeMeter>;

// --- Una historia por estado ---
export const CeroHoras: Story = { args: { normal: 0, doble: 0, triple: 0, objetivo: 48 } };

export const SoloNormal: Story = { args: { normal: 40, doble: 0, triple: 0, objetivo: 48 } };

export const ConTiempoExtra: Story = {
  args: { normal: 40, doble: 6, triple: 2, objetivo: 48, semanaAnterior: 44 },
};

export const ModoOscuro: Story = {
  args: { normal: 40, doble: 6, triple: 2, objetivo: 48, semanaAnterior: 44, theme: "dark" },
};
