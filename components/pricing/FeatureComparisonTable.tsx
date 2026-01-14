import React from "react";
import { FeatureComparisonContent } from "@/content/pricing";

/**
 * FeatureComparisonTable component props
 */
export interface FeatureComparisonTableProps {
  /** Feature comparison content */
  content: FeatureComparisonContent;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * CheckIcon component for feature availability
 */
const CheckIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={`w-5 h-5 text-status-success ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

/**
 * CrossIcon component for feature unavailability
 */
const CrossIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={`w-5 h-5 text-text-muted ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/**
 * FeatureAvailability component for displaying check/cross icon
 */
const FeatureAvailability: React.FC<{
  available: boolean;
  planName: string;
  featureName: string;
}> = ({ available, planName, featureName }) => (
  <span
    aria-label={`${featureName} is ${available ? "included" : "not included"} in ${planName}`}
  >
    {available ? <CheckIcon /> : <CrossIcon />}
  </span>
);

/**
 * FeatureComparisonTable component for comparing features across pricing tiers
 *
 * A table component that displays feature availability across different
 * pricing tiers. Responsive design with proper accessibility support.
 *
 * @example
 * ```tsx
 * <FeatureComparisonTable
 *   content={featureComparisonContent}
 * />
 * ```
 */
export const FeatureComparisonTable: React.FC<FeatureComparisonTableProps> = ({
  content,
  className = "",
}) => {
  return (
    <div className={className}>
      <h2 className="text-h2 font-semibold text-text-primary text-center mb-8">
        {content.sectionTitle}
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table
          className="w-full border-collapse"
          role="table"
          aria-label="Feature comparison across pricing plans"
        >
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="text-left py-4 px-4 text-body font-medium text-text-secondary"
              >
                Feature
              </th>
              <th
                scope="col"
                className="text-center py-4 px-4 text-body font-semibold text-text-primary"
              >
                Free
              </th>
              <th
                scope="col"
                className="text-center py-4 px-4 text-body font-semibold text-text-primary"
              >
                Pro
              </th>
              <th
                scope="col"
                className="text-center py-4 px-4 text-body font-semibold text-text-primary"
              >
                Business
              </th>
            </tr>
          </thead>
          <tbody>
            {content.features.map((feature, index) => (
              <tr
                key={feature.id}
                className={`border-b border-border ${
                  index % 2 === 0 ? "bg-background-main" : "bg-background-secondary"
                }`}
              >
                <td className="py-4 px-4 text-body text-text-primary">
                  {feature.name}
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center">
                    <FeatureAvailability
                      available={feature.free}
                      planName="Free"
                      featureName={feature.name}
                    />
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center">
                    <FeatureAvailability
                      available={feature.pro}
                      planName="Pro"
                      featureName={feature.name}
                    />
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center">
                    <FeatureAvailability
                      available={feature.business}
                      planName="Business"
                      featureName={feature.name}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {content.features.map((feature) => (
          <div
            key={feature.id}
            className="bg-background-main border border-border rounded-lg p-4"
          >
            <h3 className="text-body font-medium text-text-primary mb-3">
              {feature.name}
            </h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FeatureAvailability
                  available={feature.free}
                  planName="Free"
                  featureName={feature.name}
                />
                <span className="text-small text-text-muted">Free</span>
              </div>
              <div className="flex items-center gap-2">
                <FeatureAvailability
                  available={feature.pro}
                  planName="Pro"
                  featureName={feature.name}
                />
                <span className="text-small text-text-muted">Pro</span>
              </div>
              <div className="flex items-center gap-2">
                <FeatureAvailability
                  available={feature.business}
                  planName="Business"
                  featureName={feature.name}
                />
                <span className="text-small text-text-muted">Business</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureComparisonTable;
