import { Component } from "core";

type IncomingProps = {
  className: string
}

export class ClipIcon extends Component<IncomingProps> {
  static componentName = "ClipIcon";

  constructor(props: IncomingProps) {
    super(props);
  }

  protected render(): string {
    return  `
    <svg xmlns="http://www.w3.org/2000/svg" class="{{className}}" width="28" height="28" viewBox="0 0 32 32">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18661 13.5L14.7628 5.92389L15.7056 6.8667L8.12942 14.4428L7.18661 13.5Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70065 16.014L17.2768 8.43781L18.2196 9.38062L10.6435 16.9568L9.70065 16.014Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0433 21.3567L22.6194 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5573 23.8706L25.1335 16.2945L26.0763 17.2373L18.5001 24.8134L17.5573 23.8706Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10829 23.8919C5.50479 21.2884 5.51421 17.0579 8.12933 14.4428L7.18652 13.5C4.04838 16.6381 4.03708 21.7148 7.16127 24.839C10.2855 27.9632 15.3621 27.9518 18.5002 24.8137L17.5574 23.8709Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48304 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70093 16.0144C7.95752 17.7578 7.95123 20.5782 9.6869 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41895 20.1518 9.42335 18.1776 10.6437 16.9572L9.70093 16.0144Z"/>
    </svg>`;
  }
}

