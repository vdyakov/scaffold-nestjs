import { Novu } from '@novu/node';
import { Injectable } from '@nestjs/common';
import {
  ITriggerPayload,
  TriggerRecipientsPayload
} from '@novu/node/build/main/lib/events/events.interface';
import { ApiConfigService } from '@/shared/services/api-config.service';

@Injectable()
export class NovuService {
  private readonly novu: Novu;

  constructor(
    public configService: ApiConfigService,
  ) {
    const apiKey: string = configService.getString('NOVU_API_KEY');
    const backendUrl: string|null = configService.getString('NOVU_API_URL');

    this.novu = new Novu(apiKey, { backendUrl });
  }

  async triggerEvent(
    templateName: string,
    to: TriggerRecipientsPayload,
    payload: ITriggerPayload,
  ): Promise<void> {
    await this.novu.events.trigger(templateName, { to, payload })
  }

  async broadcastEventToAll(templateName: string, payload: ITriggerPayload): Promise<void> {
    await this.novu.events.broadcast(templateName, { payload });
  }
}
