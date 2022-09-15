// @ts-check
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
/**
 * Interface proposal
 * @interface
 */
export interface Proposal {
  id?: string
  workOrder?: string
  options?: JSON
}
@Injectable({
  providedIn: 'root',
})
/**
 * @module
 */
export class EngineService {
  /**
   * @property
   */
  private proposlaSource = new BehaviorSubject<{}>({})
  $getProposalSource = this.proposlaSource.asObservable()
  /**
   * url engine
   * @type {String}
   */
  baseUrl: string = 'http://localhost:1337/'
  /**
   * url engine
   * @type {String}
   */
  url: String = 'http://localhost:1337/'
  /**
   *
   * @param http {HttpClient}
   */
  constructor(private http: HttpClient) {}
  /**
   * Send some infromation about proposals
   * @param data {Object}
   */
  sendProposalSource(data: any) {
    this.proposlaSource.next(data)
  }
  /**
   * Get users data from engine
   * @param id {string | number}
   * @returns
   */
  public getUsers(id: string | number): Observable<any> {
    return this.http.get(this.url + 'users/' + id)
  }
  public updateUsers(id: string | number, body: FormData): Observable<any> {
    return this.http.put(this.url + 'users/' + id, body)
  }
  /**
   * get entities data from engine
   * @param entity {string}
   * @returns
   */
  public getEntities(entity: string): Observable<any> {
    return this.http.get(this.url + 'entities/' + entity)
  }
  /**
   * Add entities to database
   * @param entity {string}
   * @param body {object}
   * @returns
   */
  public postEntity(
    entity: string,
    body: {
      name: string
      company: string
      email: string
      address: string
      city: string
      state: string
      country: string
      phone: string
      mobile: string
    }
  ): Observable<any> {
    return this.http.post(this.url + 'entities/' + entity, body)
  }
  /**
   * Delete entities to database
   * @param entity {string}
   * @param id {string | number}
   * @returns
   */
  public deleteEntity(entity: string, id: string | number): Observable<any> {
    return this.http.delete(this.url + 'entities/' + entity + '/' + id)
  }
  /**
   * Update entity to database
   * @param entity {string}
   * @param id {string | number}
   * @param body {object}
   * @returns
   */
   public updateEntityUs(entity: string, id: string | number, body: FormData): Observable<any> {
    return this.http.put(this.url+ 'entities/' + entity+ '/' + id, body)
  }
  public updateEntity(
    entity: string,
    id: string | number,
    body: {
      id: number
      name: string
      company: string
      email: string
      address: string
      city: string
      state: string
      country: string
      phone: string
      mobile: string
    }
  ): Observable<any> {
    return this.http.put(this.url + 'entities/' + entity + '/' + id, body)
  }
  /**
   * get System config reports data from engine
   * @returns
   */
  public getSystems(): Observable<any> {
    return this.http.get(this.url + 'config/systems')
  }
  /**
   * get Subsystem config reports data from engine
   * @returns
   */
  public getSubsystems(): Observable<any> {
    return this.http.get(this.url + 'config/subsystems')
  }
  /**
   * get reports data from engine
   * @param report {string}
   * @returns
   */
  public getReports(report: string): Observable<any> {
    return this.http.get(this.url + 'config/' + report)
  }
  /**
   * Add reports to database
   * @param report {string}
   * @param body {object}
   * @returns
   */
  public postReports(report: string, body: FormData): Observable<any> {
    return this.http.post(this.url + 'config/' + report, body)
  }
  /**
   * Delete reports to database
   * @param report {string}
   * @param id {String | Number}
   * @returns
   */
  public deleteReports(report: string, id: string): Observable<any> {
    return this.http.delete(this.url + 'config/' + report + '/' + id)
  }
  /**
   * Update report to database
   * @param report {string}
   * @param id {String | Number}
   * @param body {object}
   * @returns
   */
  public updateReports(report: string, id: string, body: FormData): Observable<any> {
    return this.http.put(this.url + 'config/' + report + '/' + id, body)
  }
  /**
   * Add reports to database
   * @param body {Object}
   * @returns
   */
  public postWorkOrder(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'work-orders', body)
  }
  /**
   * Get work orders data from engine
   * @returns
   */
  public getWorkOrder(): Observable<any> {
    return this.http.get(this.baseUrl + 'work-orders')
  }
  /**
   * Updade work order data to database
   * @param id {String}
   * @param body {Object}
   * @returns
   */
  public updateWorkOrder(id: string, body: any): Observable<any> {
    return this.http.put(this.baseUrl + 'work-orders/' + id, body)
  }
  /**
   * Delete work order to database
   * @param id {String}
   * @returns
   */
  public deleteWorkOrder(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'work-orders/' + id)
  }
  /**
   * Get proposals config data from engine
   * @returns
   */
  public getProposalConfig(): Observable<any> {
    return this.http.get(this.baseUrl + 'items')
  }
  /**
   * get proposal grid data from engine
   * @returns
   */
  public getProposalGrid(): Observable<any> {
    return this.http.get(this.baseUrl + 'grids')
  }
  /**
   * Add proposal to database
   * @param body {Object}
   * @returns
   */
  public postProposal(body: {
    id: string
    workOrder: string
  }): Observable<any> {
    return this.http.post(this.baseUrl + 'proposals', body)
  }
  /**
   * Add proposals options
   * @param body {Object}
   * @returns
   */
  public postProposalOptions(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'proposal-options', body)
  }
  /**
   * Add inspections to data base
   * @param body {Object}
   * @returns
   */
  public postInspectionOptions(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'inspection-options', body)
  }
  /**
   * Add inspections to data base
   * @param body {Object}
   * @returns
   */
  public postInspections(body: {
    id: string
    workOrderId: string
  }): Observable<any> {
    return this.http.post(this.baseUrl + 'inspections', body)
  }
  /**
   * get countries data from engine
   * @returns
   */
   public getCountries(): Observable<any> {
    return this.http.get(this.url + 'countries')
  }
  /**
   * get states data from engine
   * @returns
   */
   public getStates(): Observable<any> {
    return this.http.get(this.url + 'states')
  }
  /**
   * get cities data from engine
   * @returns
   */
   public getCities(): Observable<any> {
    return this.http.get(this.url + 'cities')
  }
  
}
