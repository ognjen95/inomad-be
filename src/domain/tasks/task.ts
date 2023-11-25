import { User } from '../user/entity/user';
import { TaskPriority, TaskStatus, TaskType } from './enums';
import { TaskEntity } from './task.entity';

export class Task extends TaskEntity {
  constructor(
    name: string,
    startDate: Date,
    endDate: Date,
    taskStatus: TaskStatus,
    priority: TaskPriority,
    taskType: TaskType,
    description: string,
    caseId: string,
    assigneesIds: string[],
  ) {
    super();

    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.taskStatus = taskStatus;
    this.description = description;
    this.caseId = caseId;
    this.assigneesIds = assigneesIds;
    this.taskType = taskType;
    this.priority = priority;
  }

  get getId(): string {
    return this.id;
  }

  set setId(id: string) {
    this.id = id;
  }

  get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
  }

  get getStartDate(): Date {
    return this.startDate;
  }

  set setStartDate(startDate: Date) {
    this.startDate = startDate;
  }

  get getEndDate(): Date {
    return this.endDate;
  }

  set setEndDate(endDate: Date) {
    this.endDate = endDate;
  }

  get getStatus(): TaskStatus {
    return this.taskStatus;
  }

  set setStatus(status: TaskStatus) {
    this.taskStatus = status;
  }

  get getDescription(): string {
    return this.description;
  }

  set setDescription(description: string) {
    this.description = description;
  }

  get getCaseId(): string {
    return this.caseId;
  }

  set setCaseId(caseId: string) {
    this.caseId = caseId;
  }

  get getCaseName(): string {
    return this.caseName;
  }

  set setCaseName(caseName: string) {
    this.caseName = caseName;
  }

  get getAssigneeIds(): string[] {
    return this.assigneesIds;
  }

  set setAssigneeIds(assigneeIds: string[]) {
    this.assigneesIds = assigneeIds;
  }

  get getAssignees(): User[] {
    return this.assignees;
  }

  set setAssignees(assignees: User[]) {
    this.assignees = assignees;
  }

  get getPriority(): TaskPriority {
    return this.priority;
  }

  set setPriority(priority: TaskPriority) {
    this.priority = priority;
  }

  get getType(): TaskType {
    return this.taskType;
  }

  set setType(type: TaskType) {
    this.taskType = type;
  }
}
