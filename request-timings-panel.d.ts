/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   request-timings-panel.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../polymer/types/lib/elements/dom-if.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="request-timings.d.ts" />

declare namespace UiElements {

  /**
   * The `request-timings-panel` element is a panel to display a set of timings
   * for the request / response. The use case is to display timings for the request
   * where redirects are possible and timings for the redirects are calculated.
   *
   * The timings accepted by this element is defined in the HAR 1.2 spec. See The
   * `request-timings` element docs for more info.
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--request-timings-panel` | Mixin applied to the element | `{}`
   * `--arc-font-subhead` | Mixin applied to the headers element. Similar to `--paper-font-subhead` mixin in Paper elements. | `{}`
   *
   * Use `request-timings` properties an mixins to style the charts.
   */
  class RequestTimingsPanel extends Polymer.Element {

    /**
     * Computed value, if true it will display redirects details
     */
    readonly hasRedirects: boolean|null|undefined;

    /**
     * Computed value, True if any request timings are available.
     */
    readonly hasTimings: boolean|null|undefined;

    /**
     * An array of HAR 1.2 timings object.
     * It should contain a timings objects for any redirect object during
     * the request.
     * List should be arelady ordered by the time of occurence.
     */
    redirects: any[]|null|undefined;

    /**
     * The request / response HAR timings.
     */
    timings: object|null|undefined;

    /**
     * Calculated total request time (final response + redirects).
     */
    readonly requestTotalTime: number|null|undefined;
    _computeHasRedirects(redirects: any): any;
    _computeHasTimings(timings: any): any;
    _computeRequestTime(redirects: any, timings: any): any;
    _computeIndexName(index: any): any;
    _computeHarTime(har: any): any;
  }
}

interface HTMLElementTagNameMap {
  "request-timings-panel": UiElements.RequestTimingsPanel;
}
