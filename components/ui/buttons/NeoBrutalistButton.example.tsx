/* Example usage of NeoBrutalistButton component */

import NeoBrutalistButton from './NeoBrutalistButton';
import { ArrowRight, Download, Heart, Trash2 } from 'lucide-react';

export default function ButtonExamples() {
  return (
    <div className="p-8 space-y-8 bg-canvas min-h-screen">
      <h1 className="text-3xl font-bold text-text-primary mb-8">NeoBrutalist Button Examples</h1>
      
      {/* Basic variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-secondary">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <NeoBrutalistButton variant="primary">
            Primary Button
          </NeoBrutalistButton>
          
          <NeoBrutalistButton variant="secondary">
            Secondary Button
          </NeoBrutalistButton>
          
          <NeoBrutalistButton variant="outline">
            Outline Button
          </NeoBrutalistButton>
          
          <NeoBrutalistButton variant="ghost">
            Ghost Button
          </NeoBrutalistButton>
          
          <NeoBrutalistButton variant="danger">
            Danger Button
          </NeoBrutalistButton>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-secondary">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <NeoBrutalistButton variant="primary" size="small">
            Small Button
          </NeoBrutalistButton>
          
          <NeoBrutalistButton variant="primary" size="medium">
            Medium Button
          </NeoBrutalistButton>
          
          <NeoBrutalistButton variant="primary" size="large">
            Large Button
          </NeoBrutalistButton>
        </div>
      </section>

      {/* With icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-secondary">With Icons</h2>
        <div className="flex flex-wrap gap-4">
          <NeoBrutalistButton variant="primary">
            <ArrowRight size={16} />
            Continue
          </NeoBrutalistButton>
          
          <NeoBrutalistButton variant="secondary">
            <Download size={16} />
            Download
          </NeoBrutalistButton>
          
          <NeoBrutalistButton variant="outline" iconOnly>
            <Heart size={16} />
          </NeoBrutalistButton>
          
          <NeoBrutalistButton variant="danger" iconOnly>
            <Trash2 size={16} />
          </NeoBrutalistButton>
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-secondary">States</h2>
        <div className="flex flex-wrap gap-4">
          <NeoBrutalistButton variant="primary" disabled>
            Disabled Button
          </NeoBrutalistButton>
          
          <NeoBrutalistButton variant="primary" isLoading>
            Loading Button
          </NeoBrutalistButton>
        </div>
      </section>

      {/* Full width */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-secondary">Full Width</h2>
        <NeoBrutalistButton variant="primary" fullWidth>
          Full Width Button
        </NeoBrutalistButton>
      </section>

      {/* Rounded */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-secondary">Rounded</h2>
        <div className="flex flex-wrap gap-4">
          <NeoBrutalistButton variant="primary" rounded>
            Rounded Button
          </NeoBrutalistButton>
          
          <NeoBrutalistButton variant="secondary" rounded>
            Rounded Secondary
          </NeoBrutalistButton>
        </div>
      </section>
    </div>
  );
}
